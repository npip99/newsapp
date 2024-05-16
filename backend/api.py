from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from uuid import UUID
from typing import Optional
import database

app = FastAPI()

# Initialize the database
database.init_db()

# Mount the css and js directories
app.mount("/css", StaticFiles(directory="../css"), name="css")
app.mount("/js", StaticFiles(directory="../js"), name="js")

# Serve the index.html at the root
@app.get("/")
async def read_index():
    return FileResponse("../home.html")
# Serve the index.html at the root
@app.get("/home")
async def read_index():
    return FileResponse("../home.html")
# Serve the index.html at the root
@app.get("/index.html")
async def read_index():
    return FileResponse("../home.html")
@app.get("/article.html")
async def read_index():
    return FileResponse("../article.html")

class OpinionRequest(BaseModel):
    user_id: str
    article_id: UUID
    topic_id: str
    opinion: Optional[str]

@app.post("/api/record-opinion")
async def record_opinion(request: OpinionRequest):
    try:
        database.record_opinion(request.user_id, request.article_id, request.topic_id, request.opinion)
        return {"message": "Success!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
