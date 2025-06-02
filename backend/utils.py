def generate_summary(result_json: dict) -> str:
    # Simple summary logic: highlight attributes with value <=2 as improvement needed,
    # attributes with value >=4 as strengths
    attributes = result_json.get("attributes", [])
    strengths = [a["name"] for a in attributes if a["value"] >= 4]
    improvements = [a["name"] for a in attributes if a["value"] <= 2]

    summary = "Key Strengths include: " + ", ".join(strengths) + ". " if strengths else ""
    summary += "Areas for Improvement: " + ", ".join(improvements) + "." if improvements else "No major improvement areas detected."
    return summary
