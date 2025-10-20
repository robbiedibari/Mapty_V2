from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.gzip import GZipMiddleware
from pydantic import BaseModel


app = FastAPI()

# add middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.mount("/frontend", StaticFiles(directory="../frontend"), name="frontend")


class Coordinates(BaseModel):
    latitude: float
    longitude: float


@app.get("/")
async def read_root():
    return FileResponse("../frontend/index.html")


@app.post("/api/coordinates")
async def receive_coordinates(coords: Coordinates):
    print(f"Received coordinates: lat = {coords.latitude}, lng={coords.longitude}")
    return {"status": "success", "data": coords}
