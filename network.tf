resource "google_compute_network" "vpc" {
  name                    = "qa-three-tier-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "public" {
  name          = "qa-public-subnet"
  ip_cidr_range = "10.1.1.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id
}

resource "google_compute_subnetwork" "private" {
  name          = "qa-private-subnet"
  ip_cidr_range = "10.1.2.0/24"
  region        = var.region
  network       = google_compute_network.vpc.id
}
