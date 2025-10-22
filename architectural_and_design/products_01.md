# Products, Services, and Financial Securities

```python
from dataclasses import dataclass
from typing import Optional, List, Dict

# ===============================
# IDENTIFIERS (Immutable, Global)
# ===============================

@dataclass
class ProductIdentifiers:
    gtin: Optional[str] = None           # GTIN-12/13/14, UPC, EAN, ISBN
    mpn: Optional[str] = None            # Manufacturer Part Number
    brand: Optional[str] = None
    sku: str = ''                         # Internal Stock-Keeping Unit
    serial_number: Optional[str] = None
    batch_or_lot_number: Optional[str] = None
    country_of_origin: Optional[str] = None  # ISO 3166-1 alpha-2
    certifications: Optional[List[str]] = None  # e.g., CE, FCC

@dataclass
class ServiceIdentifiers:
    service_id: str = ''                  # Internal service code
    gln: Optional[str] = None             # Global Location Number
    brand: Optional[str] = None

@dataclass
class SecurityIdentifiers:
    isin: str = ''                         # International Securities Identification Number
    cusip: Optional[str] = None            # North America
    sedol: Optional[str] = None            # UK/Ireland
    internal_security_id: str = ''         # Internal enterprise ID

# ===============================
# DOMAIN MODELS (Business-Relevant)
# ===============================

@dataclass
class Product:
    identifiers: ProductIdentifiers
    name: str
    description: Optional[str] = None
    unit_of_measure: str = 'unit'          # ISO 80000
    status: str = 'active'
    stock_quantity: Optional[float] = 0.0
    reorder_point: Optional[float] = None

@dataclass
class Service:
    identifiers: ServiceIdentifiers
    name: str
    description: Optional[str] = None
    status: str = 'active'
    regions_available: Optional[List[str]] = None  # ISO 3166-1 codes

@dataclass
class Security:
    identifiers: SecurityIdentifiers
    name: str
    status: str = 'active'
    currency: str = 'USD'                   # ISO 4217
    exchange: Optional[str] = None
    issue_date: Optional[str] = None        # ISO 8601
    maturity_date: Optional[str] = None     # ISO 8601

# ===============================
# PRICING / FINANCIAL LAYER
# ===============================

@dataclass
class PriceRecord:
    currency: str = 'USD'
    amount: float = 0.0
    valid_from: Optional[str] = None       # ISO 8601
    valid_to: Optional[str] = None         # ISO 8601
    customer_tiers: Optional[List[str]] = None
    regions: Optional[List[str]] = None
    channels: Optional[List[str]] = None
    taxes: Optional[Dict[str, float]] = None

@dataclass
class PriceBook:
    sku_or_service_id: str
    prices: List[PriceRecord]

@dataclass
class SecurityPriceRecord:
    currency: str = 'USD'
    market_price: float = 0.0
    valid_from: Optional[str] = None
    valid_to: Optional[str] = None
    exchange: Optional[str] = None
    taxes: Optional[Dict[str, float]] = None

@dataclass
class SecurityPriceBook:
    security_id: str
    prices: List[SecurityPriceRecord]

# ===============================
# Example Usage
# ===============================

if __name__ == '__main__':
    # --- Product Example ---
    phone = Product(
        identifiers=ProductIdentifiers(
            gtin='0123456789012',
            mpn='M-PN-X14-BLUE-64',
            brand='TechCorp',
            sku='TC-SMART-BLU-64GB-R1',
            serial_number='S20251021B12345',
            country_of_origin='US',
            certifications=['CE', 'FCC']
        ),
        name='TechCorp Smartphone 64GB',
        stock_quantity=500
    )

    # --- Service Example ---
    installation = Service(
        identifiers=ServiceIdentifiers(
            service_id='SVC-INSTALL-PREM',
            gln='4210001010000'
        ),
        name='Premium Installation Service',
        regions_available=['US', 'MX']
    )

    # --- Security Example ---
    bond = Security(
        identifiers=SecurityIdentifiers(
            isin='US0378331005',
            cusip='037833100',
            sedol='2000021',
            internal_security_id='BOND-AAPL-2030'
        ),
        name='Apple Inc. 2030 Bond',
        currency='USD',
        exchange='NYSE',
        issue_date='2023-01-01',
        maturity_date='2030-01-01'
    )

    # --- Price Books ---
    phone_price_book = PriceBook(
        sku_or_service_id=phone.identifiers.sku,
        prices=[PriceRecord(currency='USD', amount=699.99, regions=['US'], customer_tiers=['retail'])]
    )

    installation_price_book = PriceBook(
        sku_or_service_id=installation.identifiers.service_id,
        prices=[PriceRecord(currency='USD', amount=99.99, regions=['US', 'MX'])]
    )

    bond_price_book = SecurityPriceBook(
        security_id=bond.identifiers.isin,
        prices=[SecurityPriceRecord(currency='USD', market_price=1000.0, exchange='NYSE')]
    )

    # --- Demonstrate ---
    print(phone)
    print(installation)
    print(bond)
    print(phone_price_book)
    print(installation_price_book)
    print(bond_price_book)
```

---

### ✅ Architecture Highlights

1. **Identifiers Layer** — immutable, globally unique references.
2. **Domain Layer** — business-relevant attributes, independent of pricing or transactional data.
3. **Pricing Layer** — dynamic, context-sensitive pricing for Products, Services, or Securities.
4. **International Standards Ready**

   - Products: GTIN, MPN, brand, SKU, certifications, country.
   - Services: service_id, GLN.
   - Securities: ISIN, CUSIP, SEDOL.
   - Currency: ISO 4217.
   - Units: ISO 80000.

5. **Extensible** — easy to add multi-tier pricing, regional availability, or tax rules.
