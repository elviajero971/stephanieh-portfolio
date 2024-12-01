import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="dropdown"
export default class extends Controller {
    static targets = ["menu", "button"];

    toggle() {
        // Toggle the active class on the menu
        this.menuTarget.classList.toggle("active");

        // Toggle the icon between ☰ and ✖
        if (this.menuTarget.classList.contains("active")) {
            this.buttonTarget.textContent = "✖";
        } else {
            this.buttonTarget.textContent = "☰";
        }
    }
}
