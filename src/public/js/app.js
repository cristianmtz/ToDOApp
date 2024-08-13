document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".select-task");
  const deleteButton = document.getElementById("delete-button");
  const markDoneButtons = document.querySelectorAll(".mark-done");

  function getSelectedTasks() {
    const selectedTasks = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedTasks.push(checkbox.value);
      }
    });
    return selectedTasks;
  }

  markDoneButtons.forEach((button) => {
    button.addEventListener("click", async function () {
      console.log("Button clicked");
      const id = this.getAttribute("data-id");

      try {
        const response = await fetch(`/tasks/${id}/done`, {
          method: "PATCH", // Use PATCH for partial updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ done: true }),
        });

        if (response.ok) {
          alert("Task marked as done!");
          this.disabled = true; // Optionally disable the button
          this.textContent = "✓ Done"; // Optionally update the button text
        } else {
          console.error("Failed to update task:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    });
  });

  deleteButton.addEventListener("click", async function () {
    const selectedTasks = getSelectedTasks();
    if (selectedTasks.length > 0) {
      if (
        confirm(
          "¿Estás seguro de que deseas eliminar las tareas seleccionadas?"
        )
      ) {
        for (const id of selectedTasks) {
          try {
            const response = await fetch(`/tasks/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              const row = document.querySelector(
                `tr th[scope="row"][data-id="${id}"]`
              ).parentElement;
              row.remove();
            } else {
              console.error(`Error al eliminar la tarea con id ${id}`);
            }
          } catch (error) {
            console.error(
              `Error en la solicitud de eliminación para id ${id}:`,
              error
            );
          }
          window.location.reload();
        }
      }
    } else {
      alert("No hay tareas seleccionadas para eliminar.");
    }
  });
});
