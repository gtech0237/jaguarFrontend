import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useNavigation() {

  const route = useRoute();
  const router = useRouter();

  // Active route name
  const activeRoute = computed(() => route.path);

  // Check active menu
  function isActive(path) {
    return route.path === path;
  }

  // Navigate to page
  function goTo(path) {
    router.push(path);
  }

  // Bottom menu active helper
  function isBottomActive(paths = []) {
    return paths.includes(route.path);
  }

  // Go back function
  function goBack() {
    router.back();
  }

  // Replace route (no history)
  function replace(path) {
    router.replace(path);
  }

  return {
    activeRoute,
    isActive,
    goTo,
    goBack,
    replace,
    isBottomActive
  };

}