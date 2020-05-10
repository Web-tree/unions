    # Local development
## Gradle commands
For run gradle, Java should be installed. Recommended to use OpenJDK 11+. 
### Orient DB
This commands runs OrientDB as a helm chart inside Kubernetes. 

There are few simple options to run Kubernetes locally:

- Install [Docker Desktop on Windows](https://docs.docker.com/docker-for-windows/install/) and [enable Kubernetes](https://docs.docker.com/docker-for-windows/#kubernetes) (Windows only)
- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/). Run a virtual machine with Kubernetes. Required a virtual machine provider.  
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/). Run kubernetes cluster inside docker. Docker required.

Any other option of Kubernetes cluster acceptable.

#### Start 
./gradlew runOrientDb
#### Stop 
./gradlew stopOrientDb
