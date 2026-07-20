resource "google_compute_firewall" "allow-http-ssh" {
  name    = "three-tier-allow-http-ssh"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["22", "80"]
  }

  source_ranges = ["0.0.0.0/0"]
}

resource "google_compute_firewall" "allow-backend" {
  name    = "three-tier-allow-backend"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["5000", "27017"]
  }

  source_ranges = ["10.0.1.0/24"]
}
