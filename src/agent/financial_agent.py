import os

from dotenv import load_dotenv
from groq import Groq

from .prompts import (
    SYSTEM_PROMPT,
    SUMMARY_PROMPT,
    RISK_PROMPT,
    METRICS_PROMPT,
    INVESTMENT_PROMPT
)

from .tools import (
    extract_key_metrics,
    detect_red_flags,
    calculate_profit_margin,
    yahoo_summary
)

from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / ".env")


class FinancialAgent:

    def __init__(self):

        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

    def _select_prompt(self, question: str):

        q = question.lower()

        if "summary" in q or "summarize" in q:
            return SUMMARY_PROMPT

        elif "risk" in q:
            return RISK_PROMPT

        elif "metric" in q or "revenue" in q or "profit" in q:
            return METRICS_PROMPT

        elif "invest" in q:
            return INVESTMENT_PROMPT

        else:
            return SYSTEM_PROMPT

    def analyze(self, report_text: str, question: str):

        metrics = extract_key_metrics(report_text)

        risks = detect_red_flags(report_text)

        prompt = self._select_prompt(question)

        final_prompt = f"""
{prompt}

========================

User Question

{question}

========================

Extracted Metrics

{metrics}

========================

Detected Risks

{risks}

========================

Financial Report

{report_text[:12000]}
"""

        response = self.client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },

                {
                    "role": "user",
                    "content": final_prompt
                }

            ],

            temperature=0.2

        )

        return {

            "answer": response.choices[0].message.content,

            "metrics": metrics,

            "risks": risks

        }


if __name__ == "__main__":

    report = """
Apple reported revenue of $394.3 billion.

Net income was $96.9 billion.

Cash was $62 billion.

Debt was $108 billion.

The company also mentioned litigation risks.
"""

    agent = FinancialAgent()

    result = agent.analyze(

        report,

        "Summarize the report and identify risks."

    )

    print(result["answer"])

    print(result["metrics"])

    print(result["risks"])