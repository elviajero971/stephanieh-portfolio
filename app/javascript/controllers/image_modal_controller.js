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

        // Disable scrolling on the body
        document.body.style.overflow = "hidden";
    }

    close() {
        this.modalTarget.classList.remove("active");
        this.imageTarget.src = ""; // Clear image source
        this.zoomLevel = 1; // Reset zoom level

        // Enable scrolling on the body
        document.body.style.overflow = "";
        console.log("close() this.zoomLevel", this.zoomLevel);
    }

    zoomIn() {
        if (this.zoomLevel < this.maxZoomLevel) {
            this.zoomLevel += 0.5; // Increment zoom level by 0.5
            this.updateTransform();
        }

        console.log("zoomIn() this.zoomLevel", this.zoomLevel);
    }

    zoomOut() {
        if (this.zoomLevel > 1) {
            this.zoomLevel -= 0.5; // Decrement zoom level by 0.5
            this.updateTransform();
        }

        console.log("zoomOut() this.zoomLevel", this.zoomLevel);
    }

    updateTransform() {
        if (this.zoomLevel === 1) {
            // Reset image size to fit the screen
            this.imageTarget.style.width = "100%";
            this.imageTarget.style.height = "auto";
            this.imageTarget.style.position = "relative";
            this.imageTarget.style.top = "0";
            this.imageTarget.style.left = "0";
        } else {
            // Scale the image relative to the zoom level
            this.imageTarget.style.width = `${this.zoomLevel * 100}%`;
            this.imageTarget.style.height = "auto";
            this.imageTarget.style.position = "absolute";
            this.imageTarget.style.top = "0";
            this.imageTarget.style.left = "0";
        }
    }

    handleKeyDown(event) {
        if (event.key === "Escape" && this.modalTarget.classList.contains("active")) {
            this.close();
        }

        console.log("handleKeyDown() this.zoomLevel", this.zoomLevel);
    }
}
