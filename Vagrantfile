# -*- mode: ruby -*-
# vi: set ft=ruby :
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  #config.vm.box = "ubuntu/trusty64"
  #config.vm.box = "trusty64"
  #config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

  config.vm.box = "trusty32"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-i386-juju-vagrant-disk1.box"

  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
    #v.gui = true
  end
  
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "base.yml"
    ansible.inventory_path = "dev"
    ansible.host_key_checking = false
    ansible.extra_vars = { 'ansible_connection' => 'ssh',
                           'ansible_ssh_args' => '-o ForwardAgent=yes'
                      	 }
    ansible.raw_ssh_args = ['-o UserKnownHostsFile=/dev/null', '-o StrictHostKeyChecking=false']
  end

  config.ssh.forward_agent = true
  #config.vm.network "private_network", type: "dhcp"
  config.vm.network "public_network", bridge: "eth0"

  # Create a base machine 
  config.vm.define "base" do |base|
      base.vm.network :forwarded_port, host: 8080, guest: 8080
  end
end
