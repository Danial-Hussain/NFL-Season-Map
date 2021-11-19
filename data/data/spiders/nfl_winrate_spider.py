import scrapy
from ..constants import (
    NFL_WINRATE_URL, 
    NFL_WINRATE_TEAMS_CSS_SELECTOR,
    NFL_WINRATE_RATE_CSS_SELECTOR,
    WINRATE_MAPPINGS
)
from ..items import NFLWinRateItem

class NflWinRateSpider(scrapy.Spider):
    """
    Scraper to get nfl win percentages
    Cmd: scrapy crawl NFL_WinRate
    """

    name = "NFL_WinRate"
    allowed_domains = ["https://www.teamrankings.com/"]

    custom_settings = {"ITEM_PIPELINES": {"data.pipelines.NflWinRatePipeline": 400}}

    def __init__(
        self, start_year: str = "2015" , end_year: str = "2021", *args, **kwargs
    ):
        super(NflWinRateSpider, self).__init__(*args, **kwargs)
        self.start_year = int(start_year)
        self.end_year = int(end_year)

    def start_requests(self):
        main_url = NFL_WINRATE_URL
        URLS = [
            (year, main_url + str(year))
            for year in range(self.start_year, self.end_year + 1)
        ]
        for year, url in URLS:
            yield scrapy.Request(
                url=url, 
                callback=self.parse,
                meta={"year": year}
            )

    def parse(self, response):
        teams = response.css(NFL_WINRATE_TEAMS_CSS_SELECTOR).extract()
        teams = [WINRATE_MAPPINGS[team] for team in teams]
        rates = response.css(NFL_WINRATE_RATE_CSS_SELECTOR).extract()[1:]
        rates = [float(rate.strip("%")) for rate in rates]
        item = NFLWinRateItem()
        item["teams"] = teams
        item["win_rates"] = rates
        item["year"] = response.meta["year"]
        yield item