const PDPStore = new Vuex.Store({
    state: {
        flavorOptions: [],
        packOptions: [],
        bundleItems: [],
        boosters: [],
        showEditItemDialog: false,
        showCartModal: false,
        startWithBundleAndSave: false,
        updatingItem: null,
        bundleAndSaveCount: 0,
        isBundleAvailable: false,
        hasMembershipItem: false,
        suggestedItems: [],
    },
    mutations: {
        SET_FLAVOR_OPTIONS(state, flavorOptions) {
            state.flavorOptions = flavorOptions;
        },
        SET_PACK_OPTIONS(state, packOptions) {
            state.packOptions = packOptions;
        },
        SET_BUNDLE_ITEMS(state, bundleItems) {
            state.bundleItems = bundleItems;
        },
        SET_BOOSTERS(state, boosters) {
            state.boosters = boosters;
        },
        SET_SHOW_EDIT_ITEM_DIALOG(state, showEditItemDialog) {
            state.showEditItemDialog = showEditItemDialog;
        },
        SET_SHOW_CART_MODAL(state, showCartModal) {
            state.showCartModal = showCartModal;
        },
        SET_START_WITH_BUNDLE_AND_SAVE(state, startWithBundleAndSave) {
            state.startWithBundleAndSave = startWithBundleAndSave;
        },
        SET_UPDATING_ITEM(state, item) {
            state.updatingItem = item;
        },
        SET_BUNDLE_AND_SAVE_AVAILABILITY(state, isAvailable) {
            state.isBundleAvailable = isAvailable;
        },
        SET_BUNDLE_AND_SAVE_COUNT(state, bundleAndSaveCount) {
            state.bundleAndSaveCount = bundleAndSaveCount;
        },
        SET_HAS_MEMBERSHIP_ITEM(state, hasMembershipItem) {
            state.hasMembershipItem = hasMembershipItem;
        },
        SET_SUGGESTED_ITEMS(state, suggestedItems) {
            state.suggestedItems = suggestedItems;
        },
    },
    actions: {
        setItemOptions({ commit }, model) {
            commit('SET_FLAVOR_OPTIONS', model.Flavors);
            commit('SET_PACK_OPTIONS', model.PackOptions);
        },
        clearItemOptions({ commit }) {
            commit('SET_FLAVOR_OPTIONS', []);
            commit('SET_PACK_OPTIONS', []);
        },
        setBundleItems({ commit }, bundleItems) {
            commit('SET_BUNDLE_ITEMS', bundleItems);
        },
        setBoosters({ commit }, boosters) {
            commit('SET_BOOSTERS', boosters);
        },
        editItem({ commit }, item) {
            commit('SET_UPDATING_ITEM', item);
            commit('SET_SHOW_EDIT_ITEM_DIALOG', true);
        },
        closeEditItemDialog({ commit, dispatch }) {
            dispatch('clearItemOptions');

            commit('SET_UPDATING_ITEM', null);
            commit('SET_SHOW_EDIT_ITEM_DIALOG', false);
        },
        setStartWithBundleAndSave({ commit }, value) {
            commit('SET_START_WITH_BUNDLE_AND_SAVE', value);
        },
        setSuggestedItems({ commit }, suggestedItems) {
            commit('SET_SUGGESTED_ITEMS', suggestedItems ?? []);
        },
        clearSuggestedItems({ commit }) {
            commit('SET_SUGGESTED_ITEMS', []);
        },
        openCartModal({ commit }, item) {
            commit('SET_UPDATING_ITEM', item);
            commit('SET_SHOW_CART_MODAL', true);
        },
        closeCartModal({ commit }) {
            commit('SET_SHOW_CART_MODAL', false);
        },
        setBundleAndSaveAvailability({ commit }, isAvailable) {
            commit('SET_BUNDLE_AND_SAVE_AVAILABILITY', isAvailable);
        },
        setBundleAndSaveCount({ commit }, bundleAndSaveCount) {
            commit('SET_BUNDLE_AND_SAVE_COUNT', bundleAndSaveCount);
        },
        setHasMembershipItem({ commit }, hasMembershipItem) {
            commit('SET_HAS_MEMBERSHIP_ITEM', hasMembershipItem);
        },
    },
    getters: {
        flavorOptions: state => [] ,
        packOptions: state => [],
        bundleItems: state => state.bundleItems,
        boosters: state => [],
        showEditItemDialog: state => state.showEditItemDialog,
        showCartModal: state => state.showCartModal,
        startWithBundleAndSave: state => state.startWithBundleAndSave,
        updatingItem: state => state.updatingItem,
        hasMembershipItem: state => state.hasMembershipItem,
        isBundleAvailable: state => state.isBundleAvailable,
        bundleAndSaveCount: state => state.bundleAndSaveCount,
        counterMessage: state => '',
        suggestedItems: state => state.suggestedItems,
    }
});
