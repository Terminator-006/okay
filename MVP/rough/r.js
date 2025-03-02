document.addEventListener("DOMContentLoaded", function() {
  const labels = document.querySelectorAll(".checklist label");

  const newSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8.37075 11.2583C10.4598 12.579 12.0207 14.939 12.0207 14.939H12.052C12.052 14.939 15.368 9.0712 21.5286 5.4624" stroke="black" stroke-width="1.5" stroke-linecap="square"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7212 21.25C16.8298 21.25 20.9712 17.1086 20.9712 12C20.9712 6.89137 16.8298 2.75 11.7212 2.75C6.61256 2.75 2.47119 6.89137 2.47119 12C2.47119 17.1086 6.61256 21.25 11.7212 21.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
  `;

  labels.forEach(label => {
      label.addEventListener("click", function() {
          const svgContainer = this.querySelector("svg").parentNode;
          const isChecked = this.classList.contains("checked");

          if (isChecked) {
              this.classList.remove("checked");
              svgContainer.innerHTML = `
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g opacity="0.24">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7212 21.25C16.8298 21.25 20.9712 17.1086 20.9712 12C20.9712 6.89137 16.8298 2.75 11.7212 2.75C6.61256 2.75 2.47119 6.89137 2.47119 12C2.47119 17.1086 6.61256 21.25 11.7212 21.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                      </g>
                  </svg>
              `;
          } else {
              this.classList.add("checked");
              svgContainer.innerHTML = newSVG;
          }
      });
  });
});
