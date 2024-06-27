export const filterProducts = (data, soap_category_id) => {
    if (!data || !data.objects) {
        return [];
    }
    const products = data.objects.filter(soap => {
        // Check if any of the soap's categories match the chosen category ID
        return soap.item_data.categories && soap.item_data.categories.some(category => category.id === soap_category_id);
    });

    return products;
}