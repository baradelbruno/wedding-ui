# Quick Commands to Check Your API Server

## Check if API is Running

### Windows (PowerShell):
```powershell
# Check if port 7290 is listening
Get-NetTCPConnection -LocalPort 7290 -ErrorAction SilentlyContinue

# Or use netstat
netstat -ano | findstr :7290
```

### Alternative - Test with curl:
```powershell
# Test if the endpoint responds
curl https://localhost:7290/WeddingGuests -k

# -k flag skips SSL certificate verification
```

## Start Your API Server

Navigate to your API project directory and run:

```powershell
cd path\to\your\api\project
dotnet run
```

Or press **F5** in Visual Studio to start debugging.

## Expected Output When Running:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7290
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

## Quick Test in Browser

Once your API is running, open in browser:
- https://localhost:7290/WeddingGuests

You should see JSON data or an error page (not a connection refused error).

## Common Issues

### Issue: "Cannot assign requested address"
**Solution:** Another process is using port 7290. Change the port in `launchSettings.json`

### Issue: "Application startup exception"
**Solution:** Check your connection string or database migrations

### Issue: SSL Certificate errors
**Solution:** Trust the development certificate:
```powershell
dotnet dev-certs https --trust
```
