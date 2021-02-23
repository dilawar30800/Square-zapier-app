const perform = (z, bundle) => {
  var r = Math.random().toString(36).substring(7);
  const options = {
    url: 'https://connect.squareup.com/v2/catalog/batch-upsert',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + bundle.authData.access_token,
      // 'Authorization': "Bearer EAAAECw5Su2DtbF-wFVt4aPSNb_-8jyDcoZHiYeCT5ix-Vw3wykF_54Ir5kIJdht"
    },
    params: {
      'Square-Version': '2020-06-25',
    },
    body: {
      idempotency_key: 'cae9bffb-09a6-480f-bdbf-e76efe' + r,
      batches: [
        {
          objects: [
            {
              id: '#' + bundle.inputData.item_id,
              present_at_all_locations: true,
              type: 'ITEM',
              item_data: {
                description: bundle.inputData.item_description,
                name: bundle.inputData.item_name,
                category_id: '#' + bundle.inputData.category_id,
                tax_ids: ['#SalesTax'],
                variations: [
                  {
                    type: 'ITEM_VARIATION',
                    id: '#' + bundle.inputData.variation1_id,
                    item_variation_data: {
                      item_id: '#' + bundle.inputData.item_id,
                      name: bundle.inputData.variation1_name,
                      pricing_type: 'FIXED_PRICING',
                      price_money: {
                        amount: parseInt(bundle.inputData.variation1_amount),
                        currency: 'USD',
                      },
                    },
                  },
                  {
                    type: 'ITEM_VARIATION',
                    id: '#' + bundle.inputData.variation2_id,
                    item_variation_data: {
                      item_id: '#' + bundle.inputData.item_id,
                      name: bundle.inputData.variation2_name,
                      pricing_type: 'FIXED_PRICING',
                      price_money: {
                        amount: parseInt(bundle.inputData.variation2_amount),
                        currency: 'USD',
                      },
                    },
                  },
                  {
                    type: 'ITEM_VARIATION',
                    id: '#' + bundle.inputData.variation3_id,
                    item_variation_data: {
                      item_id: '#' + bundle.inputData.item_id,
                      name: bundle.inputData.variation3_name,
                      pricing_type: 'FIXED_PRICING',
                      price_money: {
                        amount: parseInt(bundle.inputData.variation3_amount),
                        currency: 'USD',
                      },
                    },
                  },
                ],
              },
            },

            {
              type: 'CATEGORY',
              id: '#' + bundle.inputData.category_id,
              category_data: {
                name: bundle.inputData.category_name,
              },
            },
            {
              type: 'TAX',
              id: '#SalesTax',
              tax_data: {
                name: 'Sales Tax',
                enabled: bundle.inputData.sales_tax_enabled,
              },
            },
          ],
        },
      ],
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'item_id',
        label: 'Item Id',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'present_at_all_locations',
        label: 'Present At All Locations',
        type: 'boolean',
        default: '1',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'item_name',
        label: 'Item Name',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'item_description',
        label: 'Item Description',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation1_id',
        label: 'Variation Id (1)',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation1_name',
        label: 'Variation Name (1)',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation1_pricing_type',
        label: 'Variation Pricing Type (1)',
        type: 'string',
        choices: [
          {
            sample: 'Fixed Pricing',
            label: 'Fixed Pricing',
            value: 'FIXED_PRICING',
          },
        ],
        default: 'FIXED_PRICING',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation1_amount',
        label: 'Variation Amount (1)',
        type: 'integer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation2_id',
        label: 'Variation Id (2)',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation2_name',
        label: 'Variation Name (2)',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation2_pricing_type',
        label: 'Variation Pricing Type (2)',
        type: 'string',
        default: 'FIXED_PRICING',
        choices: [
          {
            sample: 'Fixed Pricing',
            label: 'Fixed Pricing',
            value: 'FIXED_PRICING',
          },
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation2_amount',
        label: 'Variation Amount',
        type: 'integer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation3_id',
        label: 'Variation Id (3)',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation3_name',
        label: 'Variation Name (3)',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation3_pricing_type',
        label: 'Variation Pricing Type (3)',
        type: 'string',
        default: 'FIXED_PRICING',
        choices: [
          {
            sample: 'Fixed Pricing',
            label: 'Fixed Pricing',
            value: 'FIXED_PRICING',
          },
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'variation3_amount',
        label: 'Variation Amount (3)',
        type: 'integer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'category_id',
        label: 'Category Id',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'category_name',
        label: 'Category Name',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'sales_tax_enabled',
        label: 'Sales Tax Enabled',
        type: 'boolean',
        default: '1',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      objects: [
        {
          type: 'ITEM',
          id: 'CHY3WS6QK55NFUBQWMVDUHWC',
          updated_at: '2020-07-01T03:51:33.649Z',
          version: 1593575493649,
          is_deleted: false,
          present_at_all_locations: true,
          item_data: {
            name: 'special tea',
            description: 'a fresh tea in less amount',
            category_id: 'TAJR75XHUAWY6XXEEUX2PHEQ',
            tax_ids: ['7R4JTPHDY4LYDHNCS4C3DG2Y'],
            variations: [
              {
                type: 'ITEM_VARIATION',
                id: 'UYRFS5S2NWGRDT2PPNVJOCHJ',
                updated_at: '2020-07-01T03:51:33.649Z',
                version: 1593575493649,
                is_deleted: false,
                present_at_all_locations: true,
                item_variation_data: {
                  item_id: 'CHY3WS6QK55NFUBQWMVDUHWC',
                  name: 'tea1',
                  ordinal: 0,
                  pricing_type: 'FIXED_PRICING',
                  price_money: { amount: 20, currency: 'USD' },
                },
              },
              {
                type: 'ITEM_VARIATION',
                id: '73USSZMTVUAVVE6TSCG3K2QN',
                updated_at: '2020-07-01T03:51:33.649Z',
                version: 1593575493649,
                is_deleted: false,
                present_at_all_locations: true,
                item_variation_data: {
                  item_id: 'CHY3WS6QK55NFUBQWMVDUHWC',
                  name: 'tea2',
                  ordinal: 1,
                  pricing_type: 'FIXED_PRICING',
                  price_money: { amount: 24, currency: 'USD' },
                },
              },
              {
                type: 'ITEM_VARIATION',
                id: 'O3WFLJUWMDETNMSKEFONJKSM',
                updated_at: '2020-07-01T03:51:33.649Z',
                version: 1593575493649,
                is_deleted: false,
                present_at_all_locations: true,
                item_variation_data: {
                  item_id: 'CHY3WS6QK55NFUBQWMVDUHWC',
                  name: 'tea3',
                  ordinal: 2,
                  pricing_type: 'FIXED_PRICING',
                  price_money: { amount: 25, currency: 'USD' },
                },
              },
            ],
            product_type: 'REGULAR',
          },
        },
        {
          type: 'CATEGORY',
          id: 'TAJR75XHUAWY6XXEEUX2PHEQ',
          updated_at: '2020-07-01T03:51:33.649Z',
          version: 1593575493649,
          is_deleted: false,
          present_at_all_locations: true,
          category_data: { name: 'Beverages' },
        },
        {
          type: 'TAX',
          id: '7R4JTPHDY4LYDHNCS4C3DG2Y',
          updated_at: '2020-07-01T03:51:33.649Z',
          version: 1593575493649,
          is_deleted: false,
          present_at_all_locations: true,
          tax_data: { name: 'Sales Tax', enabled: true },
        },
      ],
      id_mappings: [
        { client_object_id: '#tea', object_id: 'CHY3WS6QK55NFUBQWMVDUHWC' },
        {
          client_object_id: '#Beverages',
          object_id: 'TAJR75XHUAWY6XXEEUX2PHEQ',
        },
        {
          client_object_id: '#SalesTax',
          object_id: '7R4JTPHDY4LYDHNCS4C3DG2Y',
        },
        { client_object_id: '#tea1', object_id: 'UYRFS5S2NWGRDT2PPNVJOCHJ' },
        { client_object_id: '#tea2', object_id: '73USSZMTVUAVVE6TSCG3K2QN' },
        { client_object_id: '#tea3', object_id: 'O3WFLJUWMDETNMSKEFONJKSM' },
      ],
    },
    outputFields: [
      { key: 'objects[]type' },
      { key: 'objects[]id' },
      { key: 'objects[]updated_at' },
      { key: 'objects[]version' },
      { key: 'objects[]is_deleted' },
      { key: 'objects[]present_at_all_locations' },
      { key: 'objects[]item_data__name' },
      { key: 'objects[]item_data__description' },
      { key: 'objects[]item_data__category_id' },
      { key: 'objects[]item_data__tax_ids[]0' },
      { key: 'objects[]item_data__tax_ids[]1' },
      { key: 'objects[]item_data__tax_ids[]2' },
      { key: 'objects[]item_data__tax_ids[]3' },
      { key: 'objects[]item_data__tax_ids[]4' },
      { key: 'objects[]item_data__tax_ids[]5' },
      { key: 'objects[]item_data__tax_ids[]6' },
      { key: 'objects[]item_data__tax_ids[]7' },
      { key: 'objects[]item_data__tax_ids[]8' },
      { key: 'objects[]item_data__tax_ids[]9' },
      { key: 'objects[]item_data__tax_ids[]10' },
      { key: 'objects[]item_data__tax_ids[]11' },
      { key: 'objects[]item_data__tax_ids[]12' },
      { key: 'objects[]item_data__tax_ids[]13' },
      { key: 'objects[]item_data__tax_ids[]14' },
      { key: 'objects[]item_data__tax_ids[]15' },
      { key: 'objects[]item_data__tax_ids[]16' },
      { key: 'objects[]item_data__tax_ids[]17' },
      { key: 'objects[]item_data__tax_ids[]18' },
      { key: 'objects[]item_data__tax_ids[]19' },
      { key: 'objects[]item_data__tax_ids[]20' },
      { key: 'objects[]item_data__tax_ids[]21' },
      { key: 'objects[]item_data__tax_ids[]22' },
      { key: 'objects[]item_data__tax_ids[]23' },
      { key: 'objects[]item_data__variations[]type' },
      { key: 'objects[]item_data__variations[]id' },
      { key: 'objects[]item_data__variations[]updated_at' },
      { key: 'objects[]item_data__variations[]version' },
      { key: 'objects[]item_data__variations[]is_deleted' },
      { key: 'objects[]item_data__variations[]present_at_all_locations' },
      { key: 'objects[]item_data__variations[]item_variation_data__item_id' },
      { key: 'objects[]item_data__variations[]item_variation_data__name' },
      { key: 'objects[]item_data__variations[]item_variation_data__ordinal' },
      {
        key:
          'objects[]item_data__variations[]item_variation_data__pricing_type',
      },
      {
        key:
          'objects[]item_data__variations[]item_variation_data__price_money__amount',
      },
      {
        key:
          'objects[]item_data__variations[]item_variation_data__price_money__currency',
      },
      { key: 'objects[]item_data__product_type' },
      { key: 'objects[]category_data__name' },
      { key: 'objects[]tax_data__name' },
      { key: 'objects[]tax_data__enabled' },
      { key: 'id_mappings[]client_object_id' },
      { key: 'id_mappings[]object_id' },
    ],
  },
  key: 'batch_upsert_catalog_objects',
  noun: 'Catalog Objects',
  display: {
    label: 'Batch upsert catalog objects',
    description: 'Takes the list of object in batch',
    hidden: false,
    important: true,
  },
};
