import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="image-modal"
export default class extends Controller {
    static targets = ["modal", "image"];
    zoomLevel = 1;

    connect() {
        console.log("Stimulus connected to image-modal controller");
        this.modalTarget.classList.remove("active");
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
    }

    disconnect() {
        document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    }

    open(event) {
        const imageSrc = event.currentTarget.dataset.imageModalSrc;

        this.imageTarget.src = imageSrc;
        this.zoomLevel = 1;
        this.updateTransform();
        this.modalTarget.classList.add("active");
    }

    close() {
        this.modalTarget.classList.remove("active");
        this.imageTarget.src = ""; // Clear image source
    }

    zoomIn() {
        this.zoomLevel += 0.2; // Increase zoom level
        this.updateTransform();
    }

    zoomOut() {
        this.zoomLevel = Math.max(1, this.zoomLevel - 0.2); // Decrease zoom level, but not below 1
        this.updateTransform();
    }

    updateTransform() {
        this.imageTarget.style.transform = `scale(${this.zoomLevel})`;
    }

    handleKeyDown(event) {
        if (event.key === "Escape" && this.modalTarget.classList.contains("active")) {
            this.close();
        }
    }
}
