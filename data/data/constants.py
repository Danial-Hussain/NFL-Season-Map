# URLS
NFL_TEAMS_URL = "http://www.espn.com/nfl/schedulegrid/_/year/"
NFL_WINRATE_URL = "https://www.teamrankings.com/nfl/trends/win_trends/?sc=is_regular_season&range=yearly_"

# CSS Selectors
NFL_TEAMS_CSS_SELECTOR = "b a::text"
NFL_SCHEDULE_CSS_SELECTOR = "tr td"
NFL_TEAM_POINTS_CSS_SELECTOR = "#team_stats tr:nth-child(1) .left+ .right::text"
NFL_WINRATE_TEAMS_CSS_SELECTOR = ".nowrap a::text"
NFL_WINRATE_RATE_CSS_SELECTOR = ".text-right:nth-child(3)::text"

MAPPINGS = {
    "ARI": "crd",
    "ATL": "atl",
    "BAL": "rav",
    "BUF": "buf",
    "CAR": "car",
    "CHI": "chi",
    "CIN": "cin",
    "CLE": "cle",
    "DAL": "dal",
    "DEN": "den",
    "DET": "det",
    "GB":  "gnb",
    "HOU": "htx",
    "IND": "clt",
    "JAX": "jax",
    "KC":  "kan",
    "LV":  "rai",
    "LAR": "ram",
    "LAC": "sdg",
    "MIA": "mia",
    "MIN": "min",
    "NE":  "nwe",
    "NO":  "nor",
    "NYG": "nyg",
    "NYJ": "nyj",
    "PHI": "phi",
    "PIT": "pit",
    "SF":  "sfo",
    "SEA": "sea",
    "TB":  "tam",
    "TEN": "oti",
    "WSH": "was"
}

WINRATE_MAPPINGS = {
    "New Orleans":   "NO",
    "LA Rams":       "LAR",
    "Kansas City":   "KC",
    "LA Chargers":   "LAC",
    "Chicago":       "CHI",
    "New England":   "NE",
    "Houston":       "HOU",
    "Seattle":       "SEA",
    "Indianapolis":  "IND",
    "Dallas":        "DAL",
    "Baltimore":     "BAL",
    "Pittsburgh":    "PIT",
    "Philadelphia":  "PHI",
    "Tennessee":     "TEN",
    "Minnesota":     "MIN",
    "Cleveland":     "CLE",
    "Carolina":      "CAR",
    "Atlanta":       "ATL",
    "Miami":         "MIA",
    "Washington":    "WSH",
    "Green Bay":     "GB",
    "Denver":        "DEN",
    "Buffalo":       "BUF",
    "Detroit":       "DET",
    "Cincinnati":    "CIN",
    "NY Giants":     "NYG",
    "Tampa Bay":     "TB",
    "Jacksonville":  "JAX",
    "Las Vegas":     "LV",
    "San Francisco": "SF",
    "NY Jets":       "NYJ",
    "Arizona":       "ARI"
}