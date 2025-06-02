from sqlalchemy.orm import Session
from . import models, schemas

def create_brand(db: Session, brand: schemas.BrandCreate):
    db_brand = models.Brand(name=brand.name)
    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand

def get_brand_by_name(db: Session, name: str):
    return db.query(models.Brand).filter(models.Brand.name == name).first()

def get_all_brands(db: Session):
    return db.query(models.Brand).all()

def create_newsletter(db: Session, newsletter: schemas.NewsletterCreate):
    db_newsletter = models.Newsletter(**newsletter.dict())
    db.add(db_newsletter)
    db.commit()
    db.refresh(db_newsletter)
    return db_newsletter

def create_analysis_result(db: Session, analysis: schemas.AnalysisResultCreate):
    db_analysis = models.AnalysisResult(**analysis.dict())
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

def get_analysis_for_brand(db: Session, brand_id: int):
    return db.query(models.AnalysisResult).filter(models.AnalysisResult.brand_id == brand_id).all()
