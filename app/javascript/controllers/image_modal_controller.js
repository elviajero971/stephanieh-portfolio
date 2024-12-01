import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="image-modal"
export default class extends Controller {
    static targets = ["modal", "image", "imageWrapper"];
    zoomLevel = 1;
    maxZoomLevel = 2; // Maximum zoom level (2x)

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
        this.zoomLevel = 1; // Reset zoom level to default
        this.updateTransform();
        this.modalTarget.classList.add("active");
    }

    close() {
        this.modalTarget.classList.remove("active");
        this.imageTarget.src = ""; // Clear image source
        this.zoomLevel = 1; // Reset zoom level
    }

    zoomIn() {
        if (this.zoomLevel < this.maxZoomLevel) {
            this.zoomLevel += 0.5; // Increment zoom level by 0.5
            this.updateTransform();
        }
    }

    zoomOut() {
        if (this.zoomLevel > 1) {
            this.zoomLevel -= 0.5; // Decrement zoom level by 0.5
            this.updateTransform();
        }
    }

    updateTransform() {
        if (this.zoomLevel === 1) {
            // Reset image size to fit the screen
            this.imageTarget.style.width = "100%";
            this.imageTarget.style.height = "auto";
        } else {
            // Apply zoom by scaling the image
            this.imageTarget.style.transform = `scale(${this.zoomLevel})`;
        }
    }

    handleKeyDown(event) {
        if (event.key === "Escape" && this.modalTarget.classList.contains("active")) {
            this.close();
        }
    }
}
