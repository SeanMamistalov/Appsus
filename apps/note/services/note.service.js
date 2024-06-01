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
    updateColor,
    archive
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

function getEmptyNote(type = '', title = '') {
    const emptyInfo = {
        title,
        txt: '',
        url: '',
    }

    if (type === 'recording') {
        emptyInfo.url = ''
    }

    return {
        type,
        info: emptyInfo,
        backgroundColor: '#ffffff',
        isPinned: true,
        isTrashed: false,
    }
}

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
        note.backgroundColor = color
        return save(note)
    })
}

function archive(noteId) {
    return get(noteId)
        .then(note => {
            note.isArchived = true
            return save(note)
        })
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
            isArchived: false,
            backgroundColor: '#ffb4b4',
            info: {
                title: 'NoteImg',
                url: 'assets/img/apple.jpeg'
            }
        }
        notes.push(imageNote)

        const recordingNote = {
            id: utilService.makeId(5),
            createdAt: utilService.randomPastTime().toLocaleString(),
            type: 'recording',
            isPinned: true,
            isTrashed: false,
            isArchived: false,
            backgroundColor: '#b4ffe0',
            info: {
                title: 'NoteAudio',
                url: 'assets/audio/be-happy.mp3'
            }
        }
        notes.push(recordingNote)

        for (let i = 0; i < 6; i++) {
            const note = {
                id: utilService.makeId(5),
                createdAt: utilService.randomPastTime().toLocaleString(),
                type: 'txt',
                isPinned: true,
                isTrashed: false,
                isArchived: false,
                info: {
                    title: utilService.makeLorem(2),
                    txt: utilService.makeLorem(utilService.getRandomIntInclusive(2, 10))
                }
            }
            notes.push(note)
        }
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}
