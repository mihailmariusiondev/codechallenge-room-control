export interface Floor {
  id: number;
  name: string;
  rooms: Room[];
}

export interface Room {
  id: number;
  name: string;
  maximum_capacity: number;
  occupancy: number;
}
