import {Injectable} from '@angular/core';
import {Note} from '../models/note';

const NOTE_STORAGE_NAME = 'notes';


@Injectable()
export class NoteService {

    private pNotes: Array<Note> = [];

    constructor() {
        const n = window.localStorage.getItem(NOTE_STORAGE_NAME);
        if (n) {
            const noteArr = JSON.parse(n) as Array<any>;
            this.pNotes = noteArr.map(note => Note.fromJson(note));
        }
    }

    get notes(): Array<Note> {
        return this.pNotes;
    }

    public addNote(note: Note): void {
        this.pNotes.push(note);
        this.save();
    }


    private save() {
        window.localStorage.setItem(NOTE_STORAGE_NAME, JSON.stringify(this.pNotes.map(n => n.toJson())));
    }

    del(note: Note) {
        this.pNotes = this.pNotes.filter(n => n !== note);
        this.save();
    }
}
