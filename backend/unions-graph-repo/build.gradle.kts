plugins {
    id("org.unbroken-dome.helm-commands") version "1.1.1"
}

tasks.register<org.unbrokendome.gradle.plugins.helm.command.tasks.HelmAddRepository>("helmAddIncubatorRepository") {
    repositoryName.set("incubator")
    url.set(uri("https://kubernetes-charts-incubator.storage.googleapis.com"))
}

tasks.register<org.unbrokendome.gradle.plugins.helm.command.tasks.HelmInstallOrUpgrade>("runOrientDb") {
    dependsOn("helmAddIncubatorRepository")
    chart.set("incubator/orientdb")
    releaseName.set("unions-orientdb")
    values.set(mapOf(
            "rootPassword" to "password"
    ))
}

tasks.register<org.unbrokendome.gradle.plugins.helm.command.tasks.HelmUninstall>("stopOrientDb") {
    releaseName.set("unions-orientdb")
}
