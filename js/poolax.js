
      // Navbar scroll
      const navbar = document.getElementById("navbar");
      window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
        document.getElementById("scrollTop").style.display =
          window.scrollY > 400 ? "flex" : "none";
      });

      // Book button feedback
      document.getElementById("bookBtn").addEventListener("click", function () {
        this.innerHTML =
          '<i class="bi bi-check-circle-fill"></i> Booking Submitted!';
        this.style.background = "#16a34a";
        setTimeout(() => {
          this.innerHTML =
            '<i class="bi bi-calendar2-check-fill"></i> Book Appointment';
          this.style.background = "";
        }, 3000);
      });