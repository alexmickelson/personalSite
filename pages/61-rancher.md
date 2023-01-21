# Rancher

Jan 15, 2023

There are many ways to deploy your own kubernetes cluster:

- kubeadm - the official kubernetes install tool, very build it yourself
- microk8s - canonical distro kubernetes, prioritizes easy to use single node install for developers (but can do multi-node)
- r3k - one of the rancher/opensuse kubernetes distros

I have run all three of these 'distros' in production. Kubeadm was my first install tool. I found that it was very batteries not included. 

If you haven't deployed an on-prem cluster before you may not be aware of how much is involved in the task (I certainly wasn't my first time). Kubernetes is more similar to a Linux system than you might think. Kubernetes acts as a kernel, the kernel does a lot for you, but it is lacking many of the parts that make a Linux Distro. For Kubernetes, those other parts are the network stack, ingress controllers, storage controllers, etc. 

This is an intentional design decision. Kubernetes was designed to be modular, it presents a common interface that any cloud provider can sell. Google's and Amazon's cloud solutions have different interfaces for storage and ingress, so Kubernetes only needs to define an interface both companies can implement. 

This means that on-prem installs of kubernetes need to provide their own implementation of networking, ingress and storage. There are a lot of options on how to do this. I'll leave it to other guides to describe the pro's and con's the different solutions. As you add more third party projects to your cluster, it is easy to turn it into a patchwork of technologies that may or may not play nice together. Any one of these critical systems could bring your whole cluster down.

I feel it's safe to say that in my 4 years experience running kubernetes in production, most of my outages have been caused at the cluster infrastructure level, rather than at the application or data level.

Ok, so now we have defined the problem: we want on-prem kubernetes, but we also want a stable, working cluster. 

# Rancher to the Rescue

The Rancher Labs software company has been around since the early days of kubernetes and containers (they were founded in 2014). I had looked into rancher kubernetes around the 2018 era, and found it a bit lacking, but that was probably more due to my own inexperience with kubernetes.

Things changed in 2020, when Rancher Labs was aquired by SUSE. Since then, I have seen rancher get turned up to eleven. 

- Rancher OS was scrapped to simplify the rancher install
- K3S was improved and simplified
- The Longhorn storage project was developed
- The Harvester project was delivered (clustered vm management on kubernetes)
- and a bunch of other stuff

You can check out the documentation for all their projects (here)[https://rancher.com/docs]. SUSE aquired Rancher Labs for $600 million, since the aquisition the project has really thrived.

# Architecture and Install

The Rancher cluster management system needs to be installed on an existing cluster. While it may seem counter-intuitive, this ensures that your management interface is as rock solid as any other part of your infrastructure. The rancher docs are really great so I wont go into too much detail here.

1. I recommend (installing k3s)[https://docs.k3s.io/quick-start] to run as your management cluster, but I could see a justification for microk8s if you want to fly a little more quick and loose.
   1. If you want to use a non-default interface (like tailscale) use this command: `curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.24.9+k3s2 INSTALL_K3S_EXEC="--flannel-iface=tailscale0" sh -`
2. Once you have your management cluster, use (helm to install rancher)[https://ranchermanager.docs.rancher.com/getting-started/quick-start-guides/deploy-rancher-manager/helm-cli].
3. After you have rancher installed, use the GUI to create a new cluster, it will spit out a few commands you can copy and paste to add nodes.


# Using rancher to provision a cluster

The default guide covers this pretty well, the only trick is to make sure ont he done provisioning page you can configure your tailscale ip's in the advanced section