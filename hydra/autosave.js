let dirHandle = null
let autosaveTimer = null

function logError(err) {
    console.error(err)
    alert(String(err))
}

async function pickDirectory() {
    try {
        dirHandle = await window.showDirectoryPicker()
    } catch (e) {
        logError(e)
    }
}

function isHydraFile(name) {
    return /^hydra_\d+(\.js)?$/.test(name)
}

function extractTs(name) {
    const m = name.match(/^hydra_(\d+)(?:\.js)?$/)
    return m ? Number(m[1]) : -1
}

async function loadLatestFromDir() {
    try {
        let latest = null

        for await (const [name, handle] of dirHandle.entries()) {
            if (handle.kind !== "file") continue
            if (!isHydraFile(name)) continue

            const ts = extractTs(name)
            if (ts < 0) continue

            if (!latest || ts > latest.ts) latest = { ts, handle }
        }

        if (!latest) return false

        const file = await latest.handle.getFile()
        editor.setValue(await file.text())
        return true
    } catch (e) {
        logError(e)
        return false
    }
}

async function saveNewSnapshot() {
    try {
        const ts = Date.now()
        const name = `hydra_${ts}.js`
        const fileHandle = await dirHandle.getFileHandle(name, { create: true })
        const writable = await fileHandle.createWritable()
        await writable.write(editor.getValue())
        await writable.close()
    } catch (e) {
        logError(e)
    }
}

async function initHydraAutosave() {
    try {
        dirHandle = await window.showDirectoryPicker()
        const loaded = await loadLatestFromDir()

        if (!loaded) {
            await saveNewSnapshot()
        }

        if (autosaveTimer) clearInterval(autosaveTimer)
        autosaveTimer = setInterval(saveNewSnapshot, 30000)

        console.log("Hydra autosave running")
        alert("Hydra autosave running")
    } catch (e) {
        logError(e)
    }
}


startHydraDirAutosave()
