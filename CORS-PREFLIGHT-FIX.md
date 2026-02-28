# CORS Preflight Issue - OPTIONS Success but GET Fails

## Your Current Issue

✅ OPTIONS request returns 204/200  
❌ GET request never executes / returns no status

This means the CORS preflight (OPTIONS) is completing, but the browser is blocking the actual GET request because the OPTIONS response headers aren't telling the browser that GET is allowed.

## The Complete Fix

### Step 1: Update Your ASP.NET API Program.cs

Replace your CORS configuration with this EXACT code:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();

// CORS Configuration - MUST be here, before builder.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("http://localhost:5174", "http://127.0.0.1:5174")
              .AllowAnyMethod()
              .AllowAnyHeader();
        // Do NOT use .AllowCredentials() unless you need cookies/auth
    });
});

// Add other services (if you have them)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure pipeline - ORDER IS CRITICAL!
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// CORS - MUST be after UseHttpsRedirection and BEFORE UseAuthorization
app.UseCors("AllowReactDev");

app.UseAuthorization();

app.MapControllers();

app.Run();
```

### Step 2: Verify Your Controller

Make sure your controller returns data properly:

```csharp
[ApiController]
[Route("[controller]")]
public class WeddingGuestsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var data = new[] 
        { 
            new { Id = 1, Name = "John Doe" },
            new { Id = 2, Name = "Jane Smith" }
        };
        
        return Ok(data); // Returns 200 with JSON
    }
}
```

### Step 3: Restart Your API

**CRITICAL:** You must completely stop and restart your API server:

```powershell
# If running in terminal, press CTRL+C
# Then restart:
dotnet run
```

Or in Visual Studio: Stop (Shift+F5) and Start (F5) again.

### Step 4: Clear Browser Cache

After restarting the API:
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

Or use Incognito/Private mode

## How to Verify It's Working

### In Browser DevTools (F12) > Network Tab:

After clicking "Fetch Data", you should see:

**1. OPTIONS Request (Preflight):**
```
Request URL: https://localhost:7290/WeddingGuests
Request Method: OPTIONS
Status Code: 204 No Content (or 200 OK)

Response Headers MUST include:
access-control-allow-origin: http://localhost:5174
access-control-allow-methods: GET, POST, PUT, DELETE, OPTIONS
access-control-allow-headers: origin, content-type, accept
```

**2. GET Request (Actual Request):**
```
Request URL: https://localhost:7290/WeddingGuests
Request Method: GET
Status Code: 200 OK

Response Headers MUST include:
access-control-allow-origin: http://localhost:5174
content-type: application/json
```

### If GET Request is Missing

The browser blocked it! Check the Console tab for errors like:
```
Access to fetch at 'https://localhost:7290/WeddingGuests' from origin 
'http://localhost:5174' has been blocked by CORS policy: Response to 
preflight request doesn't pass access control check...
```

This means the OPTIONS response headers are wrong.

## Common Issues & Solutions

### Issue 1: OPTIONS succeeds but GET doesn't happen

**Cause:** OPTIONS response is missing `access-control-allow-methods` header or doesn't include `GET`

**Solution:** Verify your CORS policy includes `.AllowAnyMethod()` or explicitly `.WithMethods("GET", "POST", "PUT", "DELETE")`

### Issue 2: "Credentials flag is true, but Access-Control-Allow-Credentials is not present"

**Cause:** You're using `.AllowCredentials()` in CORS policy but also using `*` for origins/headers

**Solution:** Remove `.AllowCredentials()` unless you need to send cookies:
```csharp
policy.WithOrigins("http://localhost:5174")
      .AllowAnyMethod()
      .AllowAnyHeader();
// Don't add .AllowCredentials() unless needed!
```

### Issue 3: Still not working after everything

**Check these:**

1. **CORS order in Program.cs** - MUST be:
   ```
   app.UseHttpsRedirection();
   app.UseCors("YourPolicyName");
   app.UseAuthorization();
   ```

2. **Policy name matches exactly** - Same string in both:
   - `options.AddPolicy("AllowReactDev", ...)`
   - `app.UseCors("AllowReactDev")`

3. **Port numbers match** - Check your React dev server output:
   ```
   Local:   http://127.0.0.1:5174/
   ```
   Use this EXACT URL in CORS policy

4. **API actually restarted** - Old process might still be running:
   ```powershell
   # Kill all dotnet processes
   Get-Process dotnet | Stop-Process -Force
   # Then restart your API
   dotnet run
   ```

## Test with Simple Fetch

Open Browser Console on your React app and test directly:

```javascript
fetch('https://localhost:7290/WeddingGuests')
  .then(r => r.json())
  .then(d => console.log('Success:', d))
  .catch(e => console.error('Failed:', e))
```

If this works but your button doesn't, the issue is in your React code.  
If this also fails, the issue is definitely CORS configuration in the API.

## For Older .NET (Startup.cs)

If using .NET Core 3.1 or .NET 5 with Startup.cs:

```csharp
// In ConfigureServices
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    
    services.AddCors(options =>
    {
        options.AddPolicy("AllowReactDev", policy =>
        {
            policy.WithOrigins("http://localhost:5174")
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
    });
}

// In Configure - ORDER MATTERS!
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseHttpsRedirection();
    app.UseRouting();
    
    app.UseCors("AllowReactDev"); // HERE - after UseRouting!
    
    app.UseAuthorization();
    
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```
