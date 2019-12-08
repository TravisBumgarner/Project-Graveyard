type Summoner = {
    id: string,
    accountId: string,
    puuid: string,
    name: string,
    profileIconId: number,
    revisionDate: number,
    summonerLevel: number
}

// https://riot-api-libraries.readthedocs.io/en/latest/roleid.html
type Match = {
    lane: string
    gameId: number
    champion: number
    platformId: string
    timestamp: number
    queue: number
    role: string
    season: number
    accountId: string
}

type MatchMetadata = {
    seasonId: number,
    queueId: number,
    gameId: number,
    participantIdentities: string,
    //TODO How to retain this type checking? and also for events. 
    // participantIdentities: {
    //     player: {
    //         currentPlatformId: string,
    //         summonerName: string,
    //         matchHistoryUri: string,
    //         platformId: string,
    //         currentAccountId: string,
    //         profileIcon: number,
    //         summonerId: string,
    //         accountId: string
    //     }
    //     participantId: number
    // }[]
    gameVersion: string
    platformId: string
    gameMode: string
    mapId: number
    gameType: string
    // teams: any[] // This can be used later.
    // participants: any[] // This can be used later.
    gameDuration: number
    gameCreation: Date
}

// type ParticipantFrames = {
//     [key: string]: {
//         totalGold: number
//         teamScore: number
//         participantId: number
//         level: number
//         currentGold: number
//         minionsKilled: number
//         dominionScore: number
//         // position: any  // This can be used later.
//         xp: number
//         jungleMinionsKilled: number
//     }
// }

type MatchTimeline = {
    frameInterval: number
    frames: {
        timestamp: number
        events: string
        participantFrames: string
    }[]
}

export { Summoner, Match, MatchMetadata, MatchTimeline }