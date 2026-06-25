from src.agent.financial_agent import FinancialAgent


class AnalysisService:

    def __init__(self):

        self.agent = FinancialAgent()

    def analyze(self, text, question):

        return self.agent.analyze(
            text,
            question
        )