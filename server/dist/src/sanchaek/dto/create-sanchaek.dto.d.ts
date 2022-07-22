declare class MapInfo {
    lat: number;
    lng: number;
    location: string;
    address: string;
    roadAddress: string;
}
export declare class CreateSanchaekDto {
    title: string;
    content: string;
    mapInfo: MapInfo;
}
export {};
