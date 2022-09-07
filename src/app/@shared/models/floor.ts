export interface Floor {
  id: number;
  name: string;
  rooms: Room[];
}

export interface Room {
  id: number;
  maximum_capacity: number;
  occupancy: number;
}
