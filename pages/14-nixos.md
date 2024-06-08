# NixOS


Webpage of reference nix configs:
<https://mynixos.com/>


## Configs

```
 Edit this configuration file to define what should be installed on
# your system.  Help is available in the configuration.nix(5) man page
# and in the NixOS manual (accessible by running ‘nixos-help’).

{ config, pkgs, ... }:

{
  imports =
    [ # Include the results of the hardware scan.
      ./hardware-configuration.nix
      ./falcon-sensor
    ];
  custom.falcon.enable = true;

  # Bootloader.
  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  boot.kernelParams = [ "amdgpu.sg_display=0" ];

  networking.hostName = "work-laptop"; # Define your hostname.
  networking.extraHosts = 
    ''
      127.0.0.1 plausible.localhost plausible.snowdevelopment
      144.17.88.111	devdocs.snow.edu
    '';
  # networking.wireless.enable = true;  # Enables wireless support via wpa_supplicant.

  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";

  # Enable networking
  networking.networkmanager.enable = true;

  # Set your time zone.
  time.timeZone = "America/Denver";

  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";

  i18n.extraLocaleSettings = {
    LC_ADDRESS = "en_US.UTF-8";
    LC_IDENTIFICATION = "en_US.UTF-8";
    LC_MEASUREMENT = "en_US.UTF-8";
    LC_MONETARY = "en_US.UTF-8";
    LC_NAME = "en_US.UTF-8";
    LC_NUMERIC = "en_US.UTF-8";
    LC_PAPER = "en_US.UTF-8";
    LC_TELEPHONE = "en_US.UTF-8";
    LC_TIME = "en_US.UTF-8";
  };

  # Enable the X11 windowing system.
  services.xserver.enable = true;

  # Enable the GNOME Desktop Environment.
  services.xserver.displayManager.gdm.enable = true;
  services.xserver.desktopManager.gnome.enable = true;

  # Configure keymap in X11
  services.xserver = {
    xkb.variant = "";
    xkb.layout = "us";
  };

  # Enable CUPS to print documents.
  services.printing.enable = true;

  # Enable sound with pipewire.
  sound.enable = true;
  hardware.pulseaudio.enable = false;
  security.rtkit.enable = true;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
    # If you want to use JACK applications, uncomment this
    #jack.enable = true;

    # use the example session manager (no others are packaged yet so this is enabled by default,
    # no need to redefine it in your config for now)
    #media-session.enable = true;
  };

  # Enable touchpad support (enabled default in most desktopManager).
  # services.xserver.libinput.enable = true;

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.alexm = {
    isNormalUser = true;
    description = "alexm";
    extraGroups = [ "networkmanager" "wheel" "docker" "libvirtd" ];
    packages = with pkgs; [
      firefox
    #  thunderbird
      dotnet-sdk_8
      docker
      openconnect
      globalprotect-openconnect
      ansible
      lazydocker
      k9s
      parallel
      gh
      k0sctl
      kubectl
      kubernetes-helm
      dig
      gnome.gnome-themes-extra
      nmap
    ];
    shell = pkgs.fish;
  };

  # Allow unfree packages
  nixpkgs.config.allowUnfree = true;

  # List packages installed in system profile. To search, run:
  # $ nix search wget
  environment.systemPackages = with pkgs; [
    vim # Do not forget to add an editor to edit configuration.nix! The Nano editor is also installed by default.
    wget
    curl
    fishPlugins.done
    fishPlugins.fzf-fish
    fishPlugins.forgit
    fishPlugins.hydro
    fzf
    fishPlugins.grc
    grc
    git
    pkgs.gnome3.gnome-tweaks
    docker
    btop
    vscode-fhs
    libvirt
    numix-cursor-theme
    cinnamon.mint-cursor-themes
    ffmpeg
    python3

    azure-cli
    kubectl
    dbus
    htop
    cmake
    gcc
    nodejs_20
    netbird-ui
  ];

  #services.netbird.enable = true;
  programs.fish.enable = true;
  virtualisation.docker.enable = true;
  services.flatpak.enable = true;
  services.tailscale.enable = true;
  virtualisation.libvirtd.enable = true;
  programs.virt-manager.enable = true;

  fonts = {
    enableDefaultPackages = true;
    packages = with pkgs; [
      #font-awesome_4
      corefonts # Microsoft free fonts
      dejavu_fonts
      fira
      fira-mono
      line-awesome
      #google-fonts
      #inconsolata # monospaced
      #libertine
      #mononoki
      nerdfonts
      #open-dyslexic
      #overpass
      #oxygenfonts
      #powerline-fonts
      source-code-pro
      source-sans-pro
      source-serif-pro
      #ttf_bitstream_vera
      ubuntu_font_family # Ubuntu fonts
      unifont # some international languages
    ];
    fontconfig = {
      antialias = true;
      cache32Bit = true;
      hinting.enable = true;
      hinting.autohint = true;
      defaultFonts = {
        monospace = [ "FiraCode Nerd Font" ];
        sansSerif = [ "Source Sans Pro" ];
        serif = [ "Source Serif Pro" ];
      };
    };
  };


  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  # List services that you want to enable:

  # Enable the OpenSSH daemon.
  # services.openssh.enable = true;

  # Open ports in the firewall.
  # networking.firewall.allowedTCPPorts = [ ... ];
  # networking.firewall.allowedUDPPorts = [ ... ];
  # Or disable the firewall altogether.
  networking.firewall.enable = false;

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "23.11"; # Did you read the comment?

}
```


## Crowdstrike

default.nix
```
{ config, lib, pkgs, ... }:

{
  options.custom.falcon = {
    enable = lib.mkOption {
      default = false;
      example = true;
      description = ''
        Whether to install Falcon Sensor from CrowdStrike.
      '';
    };

    persistenceDirectories = lib.mkOption {
      default = [ "/opt/CrowdStrike" ];
      type = lib.types.listOf lib.types.str;
      description = ''
        Directories to persist for Falcon Sensor.
      '';
    };
  };

  config = let
    falcon-sensor = pkgs.callPackage ./falcon-sensor.nix { };
    startPreScript = pkgs.writeScript "init-falcon" ''
      #!${pkgs.bash}/bin/sh
      /run/current-system/sw/bin/mkdir -p /opt/CrowdStrike
      /run/current-system/sw/bin/touch /var/log/falconctl.log
      ln -sf ${falcon-sensor}/opt/CrowdStrike/* /opt/CrowdStrike
      ${falcon-sensor}/bin/fs-bash -c "${falcon-sensor}/opt/CrowdStrike/falconctl -g --cid"
    '';
  in
  lib.mkIf config.custom.falcon.enable {
    # Ensure directories are created and have the correct permissions
    systemd.tmpfiles.rules = lib.concatMap (dir: [
      "d ${dir} 0755 root root -"
    ]) config.custom.falcon.persistenceDirectories ++ [
      "f /var/log/falconctl.log 0644 root root -"
    ];

    # Set the correct ownership and permissions for /opt/CrowdStrike
    environment.etc."crowdstrike-permissions.sh".text = ''
      #!/bin/sh
      chown root:root /opt/CrowdStrike
      chmod 0755 /opt/CrowdStrike
      chown root:root /var/log/falconctl.log
      chmod 0644 /var/log/falconctl.log
    '';
    systemd.services.set-crowdstrike-permissions = {
      description = "Set permissions for CrowdStrike directories and log file";
      after = [ "local-fs.target" ];
      wantedBy = [ "multi-user.target" ];
      script = "/etc/crowdstrike-permissions.sh";
    };

    systemd.services.falcon-sensor = {
      enable = true;
      description = "CrowdStrike Falcon Sensor";
      unitConfig.DefaultDependencies = false;
      after = [ "local-fs.target" ];
      conflicts = [ "shutdown.target" ];
      before = [ "sysinit.target" "shutdown.target" ];
      serviceConfig = {
        ExecStartPre = "${startPreScript}";
        ExecStart = "${falcon-sensor}/bin/fs-bash -c \"${falcon-sensor}/opt/CrowdStrike/falcond\"";
        Type = "forking";
        PIDFile = "/run/falcond.pid";
        Restart = "no";
        TimeoutStopSec = "60s";
        KillMode = "process";
      };
      wantedBy = [ "multi-user.target" ];
    };
  };
}
```

falcon-sensor.nix

```
{ stdenv
, lib
, pkgs
, dpkg
, openssl
, libnl
, zlib
, fetchurl
, autoPatchelfHook
, buildFHSUserEnv
, writeScript
, ...
}:
let
  pname = "falcon-sensor";
  arch = "amd64";
  # You need to get the binary from #it guys
  src = ./falcon-sensor.deb;
  falcon-sensor = stdenv.mkDerivation {
    inherit arch src;
    name = pname;

    buildInputs = [ dpkg zlib autoPatchelfHook ];

    sourceRoot = ".";

    unpackPhase = ''                                                                                                                                                                                                                                                                                  
      dpkg-deb -x $src .                                                                                                                                                                                                                                                                            
    '';

    installPhase = ''                                                                                                                                                                                                                                                                                 
      cp -r . $out                                                                                                                                                                                                                                                                                  
    '';

    meta = with lib; {
      description = "Crowdstrike Falcon Sensor";
      homepage = "https://www.crowdstrike.com/";
      license = licenses.unfree;
      platforms = platforms.linux;
    };
  };
in
buildFHSUserEnv {
  name = "fs-bash";
  targetPkgs = pkgs: [ libnl openssl zlib ];

  extraInstallCommands = ''                                                                                                                                                                                                                                                                           
    ln -s ${falcon-sensor}/* $out/                                                                                                                                                                                                                                                                    
  '';

  runScript = "bash";
}
```