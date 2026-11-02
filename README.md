# Skillora

A modern interactive learning website.

## Learning paths

The programming catalog includes Python, Java, C, C++, and JavaScript. The home page also includes Data Science, Game Development, and Web Development. Python modules 1–3 keep their existing interactive lesson pages; modules 4–12 and the new course paths use the shared course and lesson pages.

Course outlines and lesson notes live in the JSON files under `content/`. The shared `course.html` and `lesson.html` pages render the course paths, examples, expected outputs, and takeaways. Learners can mark lessons complete and save notes to **My Notes**; course progress and saved notes are stored in browser `localStorage` on the current device.

Serve the project directory from a static web server (for example, `python3 -m http.server 8000`) to load the JSON course content and ES modules.
