import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getFilterFromSearchParams,
    togglePin,
    deletePermanently,
    duplicate,
    updateColor
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.isTrashed !== undefined) {
                notes = notes.filter(note => note.isTrashed === filterBy.isTrashed)
            } else {
                notes = notes.filter(note => !note.isTrashed)
            }
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.info.title))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            notes.sort((a, b) => a.isPinned - b.isPinned)
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => note)
}

function deletePermanently(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function remove(noteId) {
    return get(noteId)
        .then(note => {
            note.isTrashed = true
            return save(note)
        })
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

// function getEmptyNote(type = '', title = '') {
//     return { type, title }
// }

function getFilterFromSearchParams(searchParams) {
    return {
        type: searchParams.get('type') || '',
        title: searchParams.get('title') || '',
    }
}

function togglePin(noteId) {
    return get(noteId)
        .then(note => {
            note.isPinned = !note.isPinned
            return save(note)
        })
}

function duplicate(noteId) {
    return get(noteId).then(note => {
        const newNote = {
            ...note,
            id: utilService.makeId(5),
            createdAt: new Date().toLocaleString()
        }
        return save(newNote).then(() => newNote)
    })
}

function updateColor(noteId, color) {
    return get(noteId).then(note => {
        note.backgroundColor = color;
        return save(note);
    });
}

function getEmptyNote() {
    return {
        id: utilService.makeId(5),
        createdAt: new Date().toLocaleString(),
        type: 'txt',
        isPinned: false,
        isTrashed: false,
        info: {
            title: '',
            txt: ''
        }
    };
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = []
        
        const imageNote = {
            id: utilService.makeId(5),
            createdAt: utilService.randomPastTime().toLocaleString(),
            type: 'img',
            isPinned: true,
            isTrashed: false,
            info: {
                title: utilService.makeLorem(2),
                url: 'assets/img/apple.jpeg'
            }
        }
        notes.push(imageNote)

        for (let i = 0; i < 6; i++) {
            const note = {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'txt',
                isPinned: true,
                isTrashed: false,
                info: {
                    title: utilService.makeLorem(2),
                    txt: utilService.makeLorem(utilService.getRandomIntInclusive(2, 10))
                }
            }
            notes.push(note);
        }
        
        utilService.saveToStorage(NOTE_KEY, notes);
    }
}
