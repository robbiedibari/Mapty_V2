from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI()

# add middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.mount("/frontend", StaticFiles(directory="../frontend"), name="frontend")


@app.get("/")
async def read_root():
    return FileResponse("../frontend/index.html")
