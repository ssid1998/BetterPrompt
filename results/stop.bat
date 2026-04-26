@echo off
echo Stopping process on port 3000...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :3000') DO (
    IF NOT "%%T"=="0" (
        taskkill /PID %%T /F
    )
)
