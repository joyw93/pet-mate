declare class MapInfo {
    lat: string;
    lng: string;
    location: string;
    address: string;
    roadAddress: string;
}
export declare class EditSanchaekDto {
    title: string;
    content: string;
    images: string[];
    mapInfo: MapInfo;
}
export {};
