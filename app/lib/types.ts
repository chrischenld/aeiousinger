import { Note } from "../components/NoteMenuComponents";

export interface Song {
	id: string;
	title: string;
	notes: Note[];
	createdAt: number;
	updatedAt: number;
}
