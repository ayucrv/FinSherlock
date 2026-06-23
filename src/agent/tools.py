import re
import json
import yfinance as yf


def extract_key_metrics(text: str):
    """
    Extract important financial numbers using regex.
    """

    metrics = {}

    patterns = {
        "Revenue": r"revenue.*?([\$]?\d+(?:,\d+)*(?:\.\d+)?)",
        "Net Income": r"net income.*?([\$]?\d+(?:,\d+)*(?:\.\d+)?)",
        "Operating Income": r"operating income.*?([\$]?\d+(?:,\d+)*(?:\.\d+)?)",
        "EPS": r"(?:eps|earnings per share).*?([\$]?\d+(?:\.\d+)?)",
        "Cash": r"cash.*?([\$]?\d+(?:,\d+)*(?:\.\d+)?)",
        "Debt": r"debt.*?([\$]?\d+(?:,\d+)*(?:\.\d+)?)",
    }

    for name, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            metrics[name] = match.group(1)

    return metrics


def detect_red_flags(text: str):

    flags = []

    keywords = [
        "lawsuit",
        "litigation",
        "bankruptcy",
        "declining revenue",
        "negative cash flow",
        "high debt",
        "impairment",
        "risk",
        "investigation",
        "default",
    ]

    lower = text.lower()

    for word in keywords:

        if word in lower:
            flags.append(word)

    return flags


def calculate_profit_margin(revenue, net_income):

    try:

        revenue = float(str(revenue).replace(",", "").replace("$", ""))
        net_income = float(str(net_income).replace(",", "").replace("$", ""))

        return round((net_income / revenue) * 100, 2)

    except:

        return None


def yahoo_summary(ticker):

    stock = yf.Ticker(ticker)

    info = stock.info

    return {

        "Company": info.get("longName"),

        "Sector": info.get("sector"),

        "Industry": info.get("industry"),

        "Market Cap": info.get("marketCap"),

        "PE Ratio": info.get("trailingPE"),

        "Current Price": info.get("currentPrice")

    }