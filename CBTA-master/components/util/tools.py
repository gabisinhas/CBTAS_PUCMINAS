import threading


def synchronized(func):
    """It as a synchronized decorator to create synchronous requests for a given function """
    func.__lock__ = threading.Lock()

    def synced_func(*args, **kws):
        with func.__lock__:
            return func(*args, **kws)

    return synced_func
