from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.database import Base


class Brand(Base):
    __tablename__ = "brands"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    newsletters = relationship("Newsletter", back_populates="brand")
    analyses = relationship("AnalysisResult", back_populates="brand")

class Newsletter(Base):
    __tablename__ = "newsletters"
    id = Column(Integer, primary_key=True, index=True)
    content_type = Column(String)  # text/pdf/doc
    content = Column(Text)  # For text or extracted text from pdf/doc
    brand_id = Column(Integer, ForeignKey("brands.id"))

    brand = relationship("Brand", back_populates="newsletters")

class AnalysisResult(Base):
    __tablename__ = "analysis_results"
    id = Column(Integer, primary_key=True, index=True)
    brand_id = Column(Integer, ForeignKey("brands.id"))
    result_json = Column(JSON)  # Store the JSON result from analysis
    summary = Column(Text)

    brand = relationship("Brand", back_populates="analyses")
