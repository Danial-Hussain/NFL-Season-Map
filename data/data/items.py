import scrapy


class NFLTeamItem(scrapy.Item):
    teams = scrapy.Field()
    matchups = scrapy.Field()
    year = scrapy.Field()


class NFLStatsItem(scrapy.Item):
    nfl_team = scrapy.Field()
    year = scrapy.Field()
    points = scrapy.Field()