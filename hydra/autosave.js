let dirHandle = null
let autosaveTimer = null

async function pickDirectory() {
    dirHandle = await window.showDirectoryPicker()
}

function isHydraFile(name) {
    return /^hydra_\d+(\.js)?$/.test(name)
}

function extractTs(name) {
    const m = name.match(/^hydra_(\d+)(?:\.js)?$/)
    return m ? Number(m[1]) : -1
}

async function loadLatestFromDir() {
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
}

async function saveNewSnapshot() {
    const ts = Date.now()
    const name = `hydra_${ts}.js`
    const fileHandle = await dirHandle.getFileHandle(name, { create: true })
    const writable = await fileHandle.createWritable()
    await writable.write(editor.getValue())
    await writable.close()
}

async function startHydraDirAutosave() {
    await pickDirectory()

    const loaded = await loadLatestFromDir()
    if (!loaded) {
        // keep whatever is currently in the editor
    }

    if (autosaveTimer) clearInterval(autosaveTimer)
    autosaveTimer = setInterval(saveNewSnapshot, 30000)

    await saveNewSnapshot()
}

startHydraDirAutosave()
