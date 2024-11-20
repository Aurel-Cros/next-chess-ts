
export enum PiecesEnum {

    None = 0,

    WhitePawn = 11,
    WhiteBishop = 12,
    WhiteKnight = 13,
    WhiteRook = 14,
    WhiteQueen = 15,
    WhiteKing = 16,

    BlackPawn = 21,
    BlackBishop = 22,
    BlackKnight = 23,
    BlackRook = 24,
    BlackQueen = 25,
    BlackKing = 26,
}

export enum PlayerColour {
    White = "White",
    Black = "Black"
}

export enum ContextEvent {
    RESET = 'reset-board',
    UPDATE = 'update-state',
    REFRESH = 'refresh-board',
    STATUS = 'update-status',
    FORFEIT = 'player-forfeit'
}

export enum GameStatus {
    WhiteWin = 'White player won by mat',
    BlackWin = 'Black player won by mat',
    WhiteFF = 'White player forfeited',
    BlackFF = 'Black player forfeited',
    MoveInvalid = `Can't do that !`
}