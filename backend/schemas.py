from pydantic import BaseModel
from typing import List, Optional, Dict

class Attribute(BaseModel):
    name: str
    value: int

class AnalysisResultResponse(BaseModel):
    id: int
    result: str

class AnalysisResultBase(BaseModel):
    brand_id: int
    result_json: dict
    summary: str

class AnalysisResultCreate(AnalysisResultBase):
    pass

class AnalysisResult(AnalysisResultBase):
    id: int
    class Config:
        orm_mode = True

class NewsletterBase(BaseModel):
    content_type: str
    content: str
    brand_id: int

class NewsletterCreate(NewsletterBase):
    pass

class Newsletter(NewsletterBase):
    id: int
    class Config:
        orm_mode = True

class BrandBase(BaseModel):
    name: str

class BrandCreate(BrandBase):
    pass

class Brand(BrandBase):
    id: int
    newsletters: List[Newsletter] = []
    analyses: List[AnalysisResult] = []

    class Config:
        orm_mode = True
