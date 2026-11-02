const CONTENT_FILES = [
    "content/programming.json",
    "content/python-and-data.json",
    "content/creative-tech.json"
];

let contentPromise;

async function loadContent() {
    if (!contentPromise) {
        contentPromise = Promise.all(CONTENT_FILES.map(async (path) => {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`Could not load ${path}`);
            return response.json();
        })).then((collections) => Object.assign({}, ...collections));
    }
    return contentPromise;
}

export async function getCourse(courseId) {
    const collections = await loadContent();
    const course = collections[courseId];
    if (!course) return null;

    const modules = Array.isArray(course.modules) ? course.modules : [];
    modules.forEach((module, index) => {
        if (!Number.isInteger(module.number)) module.number = index + 1;
        module.notes = Array.isArray(module.notes) ? module.notes : [];
        module.takeaways = Array.isArray(module.takeaways) ? module.takeaways : [];
    });

    return { ...course, modules };
}

export function readProgress(courseId) {
    try {
        const progress = JSON.parse(localStorage.getItem("skilloraCourseProgress") || "{}");
        return Array.isArray(progress[courseId]) ? progress[courseId] : [];
    } catch {
        return [];
    }
}

export function setModuleComplete(courseId, moduleNumber, completed) {
    try {
        const progress = JSON.parse(localStorage.getItem("skilloraCourseProgress") || "{}");
        const completedModules = new Set(Array.isArray(progress[courseId]) ? progress[courseId] : []);
        if (completed) completedModules.add(moduleNumber);
        else completedModules.delete(moduleNumber);
        progress[courseId] = [...completedModules].sort((a, b) => a - b);
        localStorage.setItem("skilloraCourseProgress", JSON.stringify(progress));
        return progress[courseId];
    } catch {
        return [];
    }
}
