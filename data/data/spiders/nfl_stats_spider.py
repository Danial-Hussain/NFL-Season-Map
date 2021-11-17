import scrapy
from ..constants import MAPPINGS, NFL_TEAM_POINTS_CSS_SELECTOR
from ..items import NFLStatsItem

class NflStatsSpider(scrapy.Spider):
    """
    Scraper to get nfl team season stats
    Cmd: scrapy crawl NFL_Stats
    """

    name = "NFL_Stats"
    allowed_domains = ["pro-football-reference.com"]

    custom_settings = {"ITEM_PIPELINES": {"data.pipelines.NflStatsPipeline": 400}}

    def __init__(
        self, start_year: str = "2015" , end_year: str = "2021", *args, **kwargs
    ):
        super(NflStatsSpider, self).__init__(*args, **kwargs)
        self.start_year = int(start_year)
        self.end_year = int(end_year)

    def start_requests(self):
        main_url = "https://www.pro-football-reference.com/teams/"
        URLS = [
            (team, year, main_url + f"{MAPPINGS[team]}/{year}.htm")
            for team in MAPPINGS
            for year in range(self.start_year, self.end_year + 1)
        ]
        for team, year, url in URLS:
            yield scrapy.Request(
                url=url, 
                callback=self.parse,
                meta={"team": team, "year": year}
            )

    def parse(self, response):
        points_scored = response.css(NFL_TEAM_POINTS_CSS_SELECTOR).extract()
        item = NFLStatsItem()
        item["nfl_team"] = response.meta["team"]
        item["year"] = response.meta["year"]
        item["points"] = int(points_scored[0])
        yield item