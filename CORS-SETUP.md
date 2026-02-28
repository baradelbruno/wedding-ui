# CORS Configuration Guide for ASP.NET Web API

## The Problem
Your React app at `http://localhost:5174` is trying to access your API at `https://localhost:7290`.
Browsers block this by default due to CORS (Cross-Origin Resource Sharing) security policy.

## Solution: Configure CORS on Your ASP.NET API Server

### For .NET 6/7/8 (Minimal API or Web API)

1. **Install the CORS package** (if not already installed):
   ```bash
   dotnet add package Microsoft.AspNetCore.Cors
   ```

2. **Add CORS to your `Program.cs`**:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5174", "http://127.0.0.1:5174")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Use CORS (must be before UseAuthorization and MapControllers)
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### For .NET Core 3.1 / .NET 5 (Startup.cs)

**In `ConfigureServices` method:**
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    
    services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp", policy =>
        {
            policy.WithOrigins("http://localhost:5174", "http://127.0.0.1:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });
}
```

**In `Configure` method:**
```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseHttpsRedirection();
    app.UseRouting();
    
    // Use CORS (must be between UseRouting and UseEndpoints)
    app.UseCors("AllowReactApp");
    
    app.UseAuthorization();
    
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

## Alternative: Allow All Origins (ONLY FOR DEVELOPMENT!)

⚠️ **WARNING: Do NOT use this in production!** ⚠️

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowAll");
```

## Production Configuration

For production, specify exact origins:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Production", policy =>
    {
        policy.WithOrigins(
                "https://yourdomain.com",
                "https://www.yourdomain.com"
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

app.UseCors("Production");
```

## Testing CORS

After configuring CORS, restart your API server and try the fetch again from your React app.

You should see these headers in the response:
- `Access-Control-Allow-Origin: http://localhost:5174`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`
- `Access-Control-Allow-Headers: *`

## Common Issues

1. **Still not working?** 
   - Make sure `app.UseCors()` is called BEFORE `app.UseAuthorization()`
   - Verify the React app's origin matches exactly (check port number)

2. **SSL/Certificate errors with localhost?**
   - Trust the dev certificate: `dotnet dev-certs https --trust`

3. **Works in Postman but not browser?**
   - This confirms it's a CORS issue (Postman doesn't enforce CORS)
