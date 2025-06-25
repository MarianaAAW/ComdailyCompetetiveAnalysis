import sys
import os
import json

# Add the parent folder ('backend') to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form,APIRouter
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import shutil
import json
from backend import crud, database, models, schemas, utils
from backend.models import Brand, Newsletter

from backend.schemas import AnalysisResultResponse


models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Brand Analysis API")
api_router = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/brands/", response_model=schemas.Brand)
def create_brand(brand: schemas.BrandCreate, db: Session = Depends(get_db)):
    db_brand = crud.get_brand_by_name(db, brand.name)
    if db_brand:
        raise HTTPException(status_code=400, detail="Brand already exists")
    return crud.create_brand(db, brand)

@app.get("/brands/", response_model=List[schemas.Brand])
def read_brands(db: Session = Depends(get_db)):
    return crud.get_all_brands(db)

@app.get("/brands/{brand_id}/analysis", response_model=List[AnalysisResultResponse])
def get_brand_analyses(brand_id: int, db: Session = Depends(get_db)):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return brand.analysis_results  # returns list of all analyses


@app.post("/newsletters/")
async def upload_newsletter(
    brand_id: int = Form(...),
    content_type: str = Form(...),
    file: UploadFile = File(None),
    content_text: str = Form(None),
    db: Session = Depends(get_db),
):
    # Extract text if file uploaded, else take content_text
    if file:
        # Save file temporarily
        file_location = f"temp_uploads/{file.filename}"
        os.makedirs("temp_uploads", exist_ok=True)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # For now: simulate text extraction by reading as text file or placeholder
        # You can replace with pdfminer or docx2txt extraction here

        with open(file_location, "r", encoding="utf-8", errors="ignore") as f:
            extracted_text = f.read()

        os.remove(file_location)
        content = extracted_text
    else:
        if not content_text:
            raise HTTPException(status_code=400, detail="No newsletter content provided")
        content = content_text

    newsletter = schemas.NewsletterCreate(
        brand_id=brand_id, content_type=content_type, content=content
    )
    return crud.create_newsletter(db, newsletter)

@app.post("/analysis/")
def perform_analysis(brand_id: int, db: Session = Depends(get_db)):
    # In reality: call your comdaily model here with newsletters for brand
    # For now simulate by returning your example json and summary

    # Get newsletters content for brand
    brand_newsletters = db.query(models.Newsletter).filter(models.Newsletter.brand_id == brand_id).all()
    if not brand_newsletters:
        raise HTTPException(status_code=400, detail="No newsletters found for brand")

    # Simulated analysis JSON (your example)
    simulated_result = {
        "attributes": [
            {"name": "Bodenständig", "value": 3},
            {"name": "Familienorientiert", "value": 4},
            {"name": "Kleinstädtisch", "value": 2},
            {"name": "Ehrlich", "value": 5},
            {"name": "Aufrichtig", "value": 4},
            {"name": "Echt", "value": 3},
            {"name": "Gesund", "value": 4},
            {"name": "Ursprünglich", "value": 3},
            {"name": "Hafter", "value": 2},
            {"name": "Eingebildet", "value": 1},
            {"name": "Egoistisch", "value": 1},
            {"name": "Großstädtisch", "value": 2},
            {"name": "Unehrlich", "value": 1},
            {"name": "Unaufrichtig", "value": 1},
            {"name": "Unecht", "value": 1},
            {"name": "Ungesund", "value": 1},
            {"name": "Nachgemacht", "value": 1},
            {"name": "Traurig", "value": 1}
        ]
    }
    summary = utils.generate_summary(simulated_result)

    analysis_data = schemas.AnalysisResultCreate(
        brand_id=brand_id, result_json=simulated_result, summary=summary
    )
    analysis = crud.create_analysis_result(db, analysis_data)
    return analysis

@app.get("/analysis/{brand_id}", response_model=List[schemas.AnalysisResult])
def get_analysis(brand_id: int, db: Session = Depends(get_db)):
    return crud.get_analysis_for_brand(db, brand_id)

app.include_router(api_router)