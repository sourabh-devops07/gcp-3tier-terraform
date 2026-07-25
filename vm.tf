resource "google_compute_instance" "frontend" {
  name         = "frontend-qa-vm"
  machine_type = "e2-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2404-lts-amd64"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.public.id

    access_config {}
  }

  tags = ["frontend"]
}

resource "google_compute_instance" "backend" {
  name         = "backend-qa-vm"
  machine_type = "e2-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2404-lts-amd64"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.private.id
  }

  tags = ["backend"]
}
