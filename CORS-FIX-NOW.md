# CORS Fix for ASP.NET Web API

## Your Issue
✅ API works in browser: https://localhost:7290/WeddingGuests  
❌ Fetch from React fails: CORS policy blocking the request

## The Solution

You need to add CORS configuration to your ASP.NET Web API **Program.cs** file.

### Copy and paste this into your Program.cs:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// ⭐ ADD THIS - CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5174",
                "http://localhost:5173", 
                "http://127.0.0.1:5174",
                "http://127.0.0.1:5173"
              )
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Add other services...
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ⭐ ADD THIS - Enable CORS (MUST BE BEFORE UseAuthorization!)
app.UseCors("AllowReactDev");

app.UseAuthorization();

app.MapControllers();

app.Run();
```

### Critical Points:

1. **Order matters!** `app.UseCors()` MUST come AFTER `app.UseHttpsRedirection()` and BEFORE `app.UseAuthorization()`

2. **Origins must match exactly** - Your React app runs on `http://localhost:5174` (check your dev server output)

3. **Restart your API** after making changes

### If using Startup.cs (older .NET versions):

**ConfigureServices method:**
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    
    services.AddCors(options =>
    {
        options.AddPolicy("AllowReactDev", policy =>
        {
            policy.WithOrigins("http://localhost:5174", "http://127.0.0.1:5174")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
    });
}
```

**Configure method:**
```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseHttpsRedirection();
    app.UseRouting();
    
    // CORS must be here - after UseRouting, before UseAuthorization
    app.UseCors("AllowReactDev");
    
    app.UseAuthorization();
    
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

## How to Verify It's Working

After restarting your API, open browser DevTools (F12) > Network tab, fetch the data, and look for these headers in the response:

```
access-control-allow-origin: http://localhost:5174
access-control-allow-credentials: true
```

If you don't see these headers, CORS is not configured correctly.

## Still Not Working?

1. **Double-check the order** - `app.UseCors()` must be between `UseRouting()`/`UseHttpsRedirection()` and `UseAuthorization()`
2. **Verify the port** - Your React dev server port (check terminal, probably 5174)
3. **Restart the API completely** - Stop and start it, don't just save the file
4. **Check for typos** - The policy name must match: "AllowReactDev" in both places
